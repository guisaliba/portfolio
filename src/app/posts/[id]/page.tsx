export default function Post({ params }: { params: { id: string } }) {
  return <div>post id: {params.id} </div>;
}