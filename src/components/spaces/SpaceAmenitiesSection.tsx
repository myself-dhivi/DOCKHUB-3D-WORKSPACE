import { AmenitiesList } from "@/components/showcase/AmenitiesList";

export function SpaceAmenitiesSection({ amenities }: { amenities: string[] }) {
  return <AmenitiesList amenities={amenities} />;
}
