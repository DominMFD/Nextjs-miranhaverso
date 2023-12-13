import styles from "./page.module.scss";

import SpidersList from "@/components/SpidersList";
import { ISpiderData } from "@/interfaces/spiders";

async function getSpidersData(): Promise<{ data: ISpiderData[] }> {
  const res = await fetch(`${process.env.DOMAIN}/api/spiders`);

  if (!res.ok) {
    throw new Error("Requisição da lista falhou");
  }

  return res.json();
}

export default async function Home() {
  const spiders = await getSpidersData();

  return (
    <main className={styles.main}>
      <SpidersList spiders={spiders.data} />
    </main>
  );
}
