export default function Textarea({ name, value, onChange, placeholder, required }) {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border p-2 w-full"
        style={{ color: 'black' }}  // Yazı rengini siyah yapıyoruz
      />
    );
  }
  