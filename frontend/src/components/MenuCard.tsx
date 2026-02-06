import { MenuItem } from "@/services/menu.service";
import { useCart } from "@/context/cart.context";

interface Props {
  item: MenuItem;
}

export default function MenuCard({ item }: Props) {
  const { dispatch } = useCart();

  return (
    <div className="border-2 border-[#39ff14] rounded-lg p-4 bg-black shadow-[0_0_10px_rgba(57,255,20,0.3)]">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-40 object-cover rounded border border-[#39ff14]"
      />

      <h3 className="mt-2 font-semibold text-[#39ff14]">{item.name}</h3>
      <p className="text-sm text-[#39ff14] opacity-70">{item.description}</p>

      <div className="mt-2 flex justify-between items-center">
        <span className="font-bold text-[#39ff14]">₹{item.price}</span>
        <button
          className="px-3 py-1 bg-[#39ff14] text-black rounded font-semibold hover:shadow-[0_0_10px_#39ff14] transition-shadow"
          onClick={() => dispatch({ type: "ADD_ITEM", payload: item })}
        >
          Add
        </button>
      </div>
    </div>
  );
}
