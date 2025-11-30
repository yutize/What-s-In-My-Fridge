export function PageHeader({ headerMain, headerSub }: { headerMain: string; headerSub: string }) {
  return (
    <div className="w-full text-center py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {headerMain}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {headerSub}
      </p>
    </div>
  )
}