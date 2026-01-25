import { CreationGrid } from './CreationGrid';

const showcaseItems = [
  {
    title: "Nature & Peace",
    content: "A design showcasing peaceful imagery with serene colors in the content area. Notice the gradient Sabbath column on the right provides bold contrast.",
    image: "https://images.unsplash.com/photo-1592976370975-dcc9e764374f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG5hdHVyZSUyMHN1bnNldHxlbnwxfHx8fDE3NjkwMDk4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Geometric Patterns",
    content: "Complex geometric patterns and shapes in the content area work beautifully when the persistent Sabbath column remains simple and distinct.",
    image: "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHBhdHRlcm58ZW58MXx8fHwxNzY4OTcxNDgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Minimal & Clean",
    content: "When content is minimal and clean, the Sabbath column's rich gradient creates visual interest and balance across the layout.",
    image: "https://images.unsplash.com/photo-1622743630729-8af8d81f197d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZ3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2OTA3MjIxOXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Warm & Inviting",
    content: "Warm, inviting content with soft colors creates harmony while the Sabbath column remains set apart as intended.",
    image: "https://images.unsplash.com/photo-1749142711653-b65b4a113616?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwbGlnaHR8ZW58MXx8fHwxNzY5MDI5OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function ShowcaseSection() {
  return (
    <div className="space-y-16">
      <div>
        <h2 className="text-3xl font-bold mb-4">Showcase</h2>
        <p className="text-lg max-w-3xl">
          Explore different ways to apply the Creation Grid principle. Each example demonstrates 
          how content fills the left 6/7ths while the Sabbath column (the persistent bar on the right) 
          remains set apart.
        </p>
      </div>

      {showcaseItems.map((item, index) => (
        <CreationGrid key={index}>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-lg">{item.content}</p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Content Area (6/7ths)</h4>
                <p className="text-sm">All informational content, images, text, and design elements live here on the left.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Sabbath Column (1/7th)</h4>
                <p className="text-sm">The persistent vertical bar on the right side provides constant visual contrast.</p>
              </div>
            </div>
          </div>
        </CreationGrid>
      ))}
    </div>
  );
}
