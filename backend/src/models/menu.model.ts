export interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
}

export const menuItems: MenuItem[] = [
     {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic cheese and tomato pizza",
    price: 299,
    imageUrl: "https://raftlabs-full-stack-developer.onrender.com/public/magherita%20pizza.jpg",
  },
  {
    id: "2",
    name: "Veg Burger",
    description: "Crispy veg patty with lettuce",
    price: 149,
    imageUrl: "https://raftlabs-full-stack-developer.onrender.com/public/veg%20burger.jpg",
  },
  {
    id: "3",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with tender chicken",
    price: 249,
    imageUrl: "https://raftlabs-full-stack-developer.onrender.com/public/chicken%20biryani.jpg",
  },
  {
    id: "4",
    name: "Pasta Alfredo",
    description: "Creamy white sauce pasta with herbs",
    price: 199,
    imageUrl: "https://raftlabs-full-stack-developer.onrender.com/public/pasta%20alfredo.jpg",
  },
  {
    id: "5",
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with spices",
    price: 179,
    imageUrl: "https://raftlabs-full-stack-developer.onrender.com/public/panner%20tikka.jpg",
  },
  {
    id: "6",
    name: "French Fries",
    description: "Crispy golden fries with seasoning",
    price: 99,
    imageUrl: "https://raftlabs-full-stack-developer.onrender.com/public/french%20fries.jpg",
  },
]