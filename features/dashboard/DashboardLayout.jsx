import styled from "styled-components";
import {useRecentBookings} from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import {useRecentStays} from "./useRecentStays.js";
import Stats from "./Stats.jsx";
import {useCabin} from "../cabins/useCabin.js";
import SalesChart from "./SalesChart.jsx";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

export default function DashboardLayout() {

  const {isLoading: isBookingLoading, bookings} = useRecentBookings();
  const {isLoading: isStaysLoading, stays, confirmedStays, numDays} = useRecentStays();
  const {cabins, isLoading: isCabinsLoading} = useCabin();

  if (isBookingLoading || isStaysLoading || isCabinsLoading) return <Spinner/>;

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}/>
      <div>Today&apos;s activity</div>
      <div>Chart stay duration</div>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}
