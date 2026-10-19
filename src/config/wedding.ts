export const wedding = {
  groomName: "Cool Boi Aalim Khan",
  brideName: "Hot Adani Wind",
  weddingDate: "2026-11-15",
  weddingDateTime: "2026-11-15T16:00:00+05:30",
  displayDate: "15 November 2026",
  displayTime: "4:00 PM IST",
  invitationLine: "Together with our families",
  openingMessage: "Request the pleasure of your company",
  introductionHeading: "A celebration of love",
  introductionMessage:
    "With grateful hearts, we invite you to celebrate the beginning of our life together.",
};

export type WeddingEvent = {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  description?: string;
};

export const weddingEvents: WeddingEvent[] = [
  {
    id: "wedding-celebration",
    name: "Wedding Celebration",
    date: wedding.displayDate,
    time: wedding.displayTime,
    venue: "Venue to be announced",
  },
];
