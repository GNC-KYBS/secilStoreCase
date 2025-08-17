import { Collection } from "@/types/collection";
import { TableRowTypes } from "@/types/table";

const capitalize = (str: string) => {
  if (!str) return "";
  const [first, ...rest] = str;
  return first.toUpperCase() + rest.join("").toLowerCase();
};

export const mapCollectionsToTable = (
  collections: Collection[]
): TableRowTypes[] => {
  return collections.map((col, index) => {
    const conditions: string[] = col.filters.filters
      ? col.filters.filters.map((f) => {
          switch (f.id) {
            case "color":
              return `Ürün renk bilgisi şuna eşit: ${capitalize(f.valueName)}`;
            case "size":
            case "category":
              return `Ürün beden bilgisi şuna eşit: ${capitalize(f.valueName)}`;
            case "tag":
              return `Ürün etiket bilgisi şuna eşit: ${capitalize(
                f.valueName
              )}`;
            default:
              return `${capitalize(f.title)} bilgisi şuna eşit: ${capitalize(
                f.valueName
              )}`;
          }
        })
      : [""];

    return {
      id: col.id, // collection id
      title: `Koleksiyon-${index + 1}`,
      conditions,
      salesChannel: col.salesChannelId,
    };
  });
};
