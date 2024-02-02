import supabase from "./superbase.js";

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

export async function createCabins(newCabin){
  // https://npunyyiewzxjsjyialju.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. Create a cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([newCabin])
    .select();


  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created.");
  }

  // 2. Upload an image

  return data;
}