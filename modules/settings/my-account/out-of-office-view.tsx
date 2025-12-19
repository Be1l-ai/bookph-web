"use client";

import { useEffect, useState } from "react";

import { useCompatSearchParams } from "@bookph/core/lib/hooks/useCompatSearchParams";

import { CreateOrEditOutOfOfficeEntryModal } from "@bookph/core/features/settings/outOfOffice/CreateOrEditOutOfOfficeModal";
import type { BookingRedirectForm } from "@bookph/core/features/settings/outOfOffice/CreateOrEditOutOfOfficeModal";
import { HolidaysView } from "./holidays-view";
import OutOfOfficeEntriesList from "@bookph/core/features/settings/outOfOffice/OutOfOfficeEntriesList";
import { OutOfOfficeTab } from "@bookph/core/features/settings/outOfOffice/OutOfOfficeToggleGroup";

export default function OutOfOfficeView() {
  const [openModal, setOpenModal] = useState(false);
  const [currentlyEditingOutOfOfficeEntry, setCurrentlyEditingOutOfOfficeEntry] =
    useState<BookingRedirectForm | null>(null);

  const params = useCompatSearchParams();
  const openModalOnStart = !!params?.get("om");
  const selectedTab = params?.get("type") ?? OutOfOfficeTab.MINE;

  useEffect(() => {
    if (openModalOnStart) {
      setOpenModal(true);
    }
  }, [openModalOnStart]);

  const handleOpenCreateDialog = () => {
    setCurrentlyEditingOutOfOfficeEntry(null);
    setOpenModal(true);
  };

  const handleOpenEditDialog = (entry: BookingRedirectForm) => {
    setCurrentlyEditingOutOfOfficeEntry(entry);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentlyEditingOutOfOfficeEntry(null);
  };

  // Show HolidaysView when holidays tab is selected
  if (selectedTab === OutOfOfficeTab.HOLIDAYS) {
    return <HolidaysView />;
  }

  return (
    <>
      <OutOfOfficeEntriesList
        onOpenCreateDialog={handleOpenCreateDialog}
        onOpenEditDialog={handleOpenEditDialog}
      />
      {openModal && (
        <CreateOrEditOutOfOfficeEntryModal
          openModal={openModal}
          closeModal={handleCloseModal}
          currentlyEditingOutOfOfficeEntry={currentlyEditingOutOfOfficeEntry}
        />
      )}
    </>
  );
}

