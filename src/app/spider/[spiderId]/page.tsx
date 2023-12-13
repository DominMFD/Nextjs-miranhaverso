import Carousel from "@/components/Carousel";
import { ISpiderData } from "@/interfaces/spiders";

interface IProps {
  params: {
    spiderId: string;
  };
}

async function getSpidersData(): Promise<{ data: ISpiderData[] }> {
  const res = await fetch(`${process.env.DOMAIN}/api/spiders`);

  if (!res.ok) {
    throw new Error("Requisição da lista falhou");
  }

  return res.json();
}

export default async function Spider({ params: { spiderId } }: IProps) {
  const spiders = await getSpidersData();
  return <Carousel spiders={spiders.data} activeId={spiderId} />;
}
