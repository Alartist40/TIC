import { Check, AlertCircle, X } from 'lucide-react';

interface KeyItemProps {
  type: 'check' | 'alert' | 'x';
  title: string;
  description: string;
}

function KeyItem({ type, title, description }: KeyItemProps) {
  const icons = {
    check: <Check className="w-6 h-6 text-green-600" />,
    alert: <AlertCircle className="w-6 h-6 text-amber-500" />,
    x: <X className="w-6 h-6 text-red-600" />
  };

  const bgColors = {
    check: 'bg-green-50 border-green-200',
    alert: 'bg-amber-50 border-amber-200',
    x: 'bg-red-50 border-red-200'
  };

  return (
    <div className={`flex gap-4 p-4 rounded-lg border ${bgColors[type]}`}>
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <div>
        <div className="font-semibold mb-1">{title}</div>
        <div className="text-sm opacity-80">{description}</div>
      </div>
    </div>
  );
}

export function GuidelinesKey() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-6">Guidelines Key</h3>
      <KeyItem
        type="check"
        title="Acceptable and Preferred"
        description="You can reliably use these applications across many different contexts without needing to worry much about visual coherence."
      />
      <KeyItem
        type="alert"
        title="Acceptable but Not Preferred"
        description="When using these applications, be very careful to note how other visual elements interact with the specific element."
      />
      <KeyItem
        type="x"
        title="Unacceptable"
        description="These applications could cause fragmentation of the identity or simply be poorly designed."
      />
    </div>
  );
}
