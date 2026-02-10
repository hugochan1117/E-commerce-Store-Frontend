
interface Props {
  color: string;
  isSelected: boolean;
  tooltip?: string;   // extra optional prop for hover message
}

export default function ColourVariantBox({ color, isSelected, tooltip }: Props) {
  return (
    <div
      title={tooltip}
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: color,
        borderRadius: "6px",
        cursor: isSelected ? "default" : "pointer",
        border: isSelected ? "3px solid #333" : "1px solid #ccc",
        margin: "5px",
        boxShadow: isSelected ? "0 0 5px rgba(0,0,0,0.4)" : "none",
        opacity: isSelected ? 0.7 : 1,
      }}
    />
  );
}

