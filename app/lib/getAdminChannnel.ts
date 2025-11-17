export async function generateMetadata({ params }: { params: { id: string }}) {
  const res = await fetch(`http://localhost:5000/channel/${params.id}`);
  const channel = await res.json();
  return {
    title: channel.name,
    description: channel.bio,
  };
}
