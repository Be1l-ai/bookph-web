"use client";

import {
  BookerWebWrapper,
  type BookerWebWrapperAtomProps,
} from "@bookph/core/atoms/booker";
import { getBookerWrapperClasses } from "@bookph/core/features/bookings/Booker/utils/getBookerWrapperClasses";

import BookingPageErrorBoundary from "@components/error/BookingPageErrorBoundary";

export type TeamBookingPageProps = Omit<
  BookerWebWrapperAtomProps,
  "eventData"
> &
  Required<Pick<BookerWebWrapperAtomProps, "eventData">> & {
    isEmbed?: boolean;
  };

export default function TeamBookingPage(props: TeamBookingPageProps) {
  return (
    <BookingPageErrorBoundary>
      <main className={getBookerWrapperClasses({ isEmbed: !!props.isEmbed })}>
        <BookerWebWrapper {...props} />
      </main>
    </BookingPageErrorBoundary>
  );
}
