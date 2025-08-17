import CollectionEdit from "@/components/CollectionEdit";

export default function Page({ params }: { params: { id: string } }) {
  return <CollectionEdit collectionId={params.id} />;
}
