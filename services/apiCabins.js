import supabase, {supabaseUrl} from "./superbase.js";

export async function getCabins(){
  let { data, error } = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function deleteCabins(id){

  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted.");
  }

  return data;
}

// passing 'id' as parameter to find if it is an edit session or not
export async function createEditCabins(newCabin, id) {

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl );

  const randomImageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath ? newCabin.image
    :
    `${supabaseUrl}/storage/v1/object/public/cabin-images/${randomImageName}`;

  // 1. Create/Edit a cabin
  let query = supabase.from('cabins');

  // A. Create a cabin
  if(!id){
    query = query.insert([{ ...newCabin, image: imagePath }])
  }

  // B. Edit a cabin
  if (id){
    query = query.update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select()
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created.");
  }

  // 2. Upload an image

  // while duplication if the image is already present in old cabin than no need to upload image in new copy
  if (hasImagePath) return data;

  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(randomImageName, newCabin.image);

  // 3. Delete the cabin if there was an error in uploading the image.
  
   if (storageError) {
     await supabase
       .from('cabins')
       .delete()
       .eq('id', data.id);
     console.error(storageError);
     throw new Error("Cabins image could not be uploaded and the cabin was not created.");
   }

  return data;
}