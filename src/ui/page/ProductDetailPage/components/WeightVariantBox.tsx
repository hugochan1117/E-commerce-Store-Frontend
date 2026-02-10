interface Props {
  weight: string;        // e.g. "10kg", "20kg"
  isSelected: boolean;
  tooltip?: string;      // optional hover message, defaults to weight
}

export default function WeightVariantBox({ weight, isSelected, tooltip }: Props) {
  return (
    <div
      title={tooltip ?? weight}
      style={{
        minWidth: "60px",
        padding: "8px 12px",
        backgroundColor: isSelected ? "#f0f0f0" : "#fff",
        borderRadius: "8px",
        cursor: isSelected ? "default" : "pointer",
        border: isSelected ? "2px solid #333" : "1px solid #ccc",
        margin: "5px",
        boxShadow: isSelected ? "0 0 6px rgba(0,0,0,0.3)" : "none",
        opacity: isSelected ? 0.8 : 1,
        textAlign: "center",
        fontWeight: 600,
        fontSize: "14px",
      }}
    >
      {weight}
    </div>
  );
}
