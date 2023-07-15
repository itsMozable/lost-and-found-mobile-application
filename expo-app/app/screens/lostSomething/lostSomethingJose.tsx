/* import { notFound } from 'next/navigation';
import { getItemsByCategoryAndState } from '../../database/itemsDatabase';

type Props = {
  item: {
    id: string;
    username: string;
  };
};

export default async function ProfileUserItemsPage() {
  const item = await getItemsByCategoryAndState();

  if (!item) {
    notFound();
  }

  return (
    <>
      <div>id: {item.id}</div>
      <div>username: {item.itemname}</div>
    </>
  );
}
 */
