import Counter from '@/components/counter'

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-thin text-slate-800 mb-8">NextJs 13 Sandbox</h1>
      <h3 className="uppercase text-2xl font-semibold text-teal-300">Counter</h3>
      <Counter />
    </>
  )
}
