// components/utils/filterListings.js

export function filterListings(data, params) {
  const selectedTowns = params
    .getAll("town")
    .map((t) => t.trim().toLowerCase());
  const bedrooms = params.get("bedrooms");
  const bathrooms = params.get("bathrooms");
  const priceMin = parseInt(params.get("priceMin"), 10);
  const priceMax = parseInt(params.get("priceMax"), 10);

  return data.filter((listing) => {
    const unit = listing.units?.[0];
    if (!unit) return false;

    const town = unit.TOWN_NAME?.trim().toLowerCase() || "";
    const neighborhood = unit.NEIGHBORHOOD?.trim().toLowerCase() || "";
    const zip = unit.ZIP_CODE?.toString();

    const townMatch =
      selectedTowns.length === 0 ||
      selectedTowns.some((selected) => {
        return (
          town === selected ||
          neighborhood === selected ||
          `${neighborhood} – boston` === selected
        );
      });

    const bedroomsMatch =
      !bedrooms ||
      unit.NO_BEDROOMS === bedrooms ||
      (bedrooms === "5+" && parseInt(unit.NO_BEDROOMS, 10) >= 5);

    const bathroomsMatch =
      !bathrooms ||
      unit.NO_FULL_BATHS === bathrooms ||
      (bathrooms === "3+" && parseFloat(unit.NO_FULL_BATHS || 0) >= 3);

    const price = parseInt(unit.LIST_PRICE, 10);
    const priceMinMatch = isNaN(priceMin) || price >= priceMin;
    const priceMaxMatch = isNaN(priceMax) || price <= priceMax;

    return (
      townMatch &&
      bedroomsMatch &&
      bathroomsMatch &&
      priceMinMatch &&
      priceMaxMatch
    );
  });
}
