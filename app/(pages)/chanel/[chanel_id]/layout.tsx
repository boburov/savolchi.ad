export async function generateMetadata({ params }: any) {
  const { chanel_id } = await params;

  try {
    const res = await fetch(`http://localhost:5000/channel/${chanel_id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Channel not found");
    }

    const channel = await res.json();

    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const titleName = capitalize(channel.name);

    return {
      title: `Savolchi - ${titleName}` || "Savolchi Admin",
      description: channel.bio || "Savolchi Test Platformasi",
      icons: { icon: "/savolchi.svg" },
    };
  } catch (err) {
    return {
      title: "Savolchi Admin",
      description: "Savolchi Test Platformasi",
      icons: { icon: "/savolchi.svg" },
    };
  }
}

export default function ChannelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
