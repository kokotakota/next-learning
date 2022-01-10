import { useCountContext } from 'contexts/count' 

export default function Child () {
  const count = useCountContext()

  return (
    <>
      counst: {count} （子コンポーネント）
    </>
  )
}