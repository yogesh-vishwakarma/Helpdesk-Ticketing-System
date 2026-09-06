function CategoryOverview({ data = [] }) {
  if (data.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-base-content/50">
        No category data available
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((item) => (
        <div
          key={item.category}
          className="rounded-xl border border-base-300 p-4 transition hover:border-primary/40 hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/60">Category</p>

              <p className="mt-1 font-semibold">{item.category}</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
              {item.count}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryOverview;