export default function Input({ name, value, onChange, placeholder, required, type = "text" }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full p-2 border border-gray-300 rounded-md"
      style={{ color: 'black', marginBottom:'10px' }}  // Yazı rengini siyah yapıyoruz
 
    />
  );
}
        