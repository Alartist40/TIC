import { CreationGrid } from './CreationGrid';
import { Check, AlertCircle, X } from 'lucide-react';

interface ExampleCardProps {
  status: 'good' | 'caution' | 'bad';
  title: string;
  children: React.ReactNode;
}

function ExampleCard({ status, title, children }: ExampleCardProps) {
  const statusConfig = {
    good: {
      icon: <Check className="w-5 h-5" />,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200'
    },
    caution: {
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    },
    bad: {
      icon: <X className="w-5 h-5" />,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200'
    }
  };

  const config = statusConfig[status];

  return (
    <div className="space-y-2">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-t-lg ${config.bg} border-t border-x ${config.border}`}>
        <span className={config.color}>{config.icon}</span>
        <span className={`font-medium ${config.color}`}>{title}</span>
      </div>
      <div className="border rounded-b-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function GridExamples() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl font-semibold mb-6">Example Applications</h3>
        <p className="text-lg mb-8 max-w-3xl">
          The following examples demonstrate proper and improper use of the Creation Grid system. 
          Notice how the contrast between the content area and the Sabbath column (on the right) creates visual interest.
        </p>
      </div>

      {/* Good Example 1: Simple content with colorful Sabbath column */}
      <ExampleCard status="good" title="Preferred: Simple, clean content with vibrant Sabbath column">
        <CreationGrid>
          <div className="space-y-4 min-h-[300px]">
            <h2 className="text-3xl font-bold">Welcome to Our Community</h2>
            <p className="text-lg">
              The Creation Grid uses a seven-column structure where the first six columns 
              contain your content, and the seventh column—the Sabbath column—is set apart 
              as something special and different.
            </p>
            <p>
              This example uses simple, clean content on the left with a vibrant gradient 
              in the Sabbath column (visible on the right side of the page), creating strong contrast.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                ✓ Simple typography and minimal styling in the content area allows the 
                Sabbath column to stand out.
              </p>
            </div>
          </div>
        </CreationGrid>
      </ExampleCard>

      {/* Good Example 2: Colorful content with simple Sabbath column */}
      <ExampleCard status="good" title="Preferred: Rich, colorful content would pair with simple Sabbath column">
        <CreationGrid>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
            <div className="bg-blue-500 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Creative Expression</h3>
              <p>Fill these six columns with vibrant designs, images, and content.</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Dynamic Content</h3>
              <p>Use colors, patterns, and visual elements freely here.</p>
            </div>
            <div className="bg-purple-500 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Bold Design</h3>
              <p>When content is colorful, the Sabbath column should be simple.</p>
            </div>
            <div className="bg-orange-500 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Visual Balance</h3>
              <p>This creates the necessary contrast for the design system.</p>
            </div>
          </div>
        </CreationGrid>
      </ExampleCard>

      {/* Caution Example */}
      <ExampleCard status="caution" title="Acceptable but not preferred: Moderate contrast">
        <CreationGrid>
          <div className="space-y-4 min-h-[300px]">
            <h2 className="text-3xl font-bold text-slate-700">Community Events</h2>
            <div className="bg-slate-100 p-4 rounded">
              <p className="text-slate-600">
                This example uses moderate contrast. The content area has some color, 
                and the Sabbath column (on the right) also has a gradient. While acceptable, 
                this doesn't create as strong a visual distinction.
              </p>
            </div>
            <div className="bg-slate-100 p-4 rounded">
              <p className="text-slate-600">
                Be careful when using this approach—ensure the seventh column still 
                feels distinct and special.
              </p>
            </div>
            <div className="bg-slate-200 p-4 rounded">
              <p className="text-slate-600">
                ⚠ The visual contrast could be stronger to better honor the design principle.
              </p>
            </div>
          </div>
        </CreationGrid>
      </ExampleCard>

      {/* Bad Example */}
      <ExampleCard status="bad" title="Unacceptable: No contrast - both areas too similar">
        <CreationGrid>
          <div className="space-y-4 min-h-[300px]">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
              <h2 className="text-3xl font-bold">Too Much Color Everywhere</h2>
              <p className="text-lg">
                This example fails because the content area is equally colorful and 
                complex as the Sabbath column.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-lg">
              <p>
                There's no contrast or distinction. The seventh column doesn't feel special 
                or set apart—it's just more of the same.
              </p>
            </div>
            <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white p-6 rounded-lg">
              <p>
                ✗ Both the content and Sabbath column are vibrant and complex, violating 
                the core principle of contrast.
              </p>
            </div>
          </div>
        </CreationGrid>
      </ExampleCard>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
        <h3 className="font-bold text-lg mb-2">Remember</h3>
        <p className="text-gray-700">
          The Sabbath column is the persistent vertical bar on the right side of this entire website. 
          All content should stay in the left 6/7ths, while the right 1/7th remains set apart and special.
        </p>
      </div>
    </div>
  );
}
