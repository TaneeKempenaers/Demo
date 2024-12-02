import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="text-center space-y-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800">Welkom bij mijn demo website</h1>
      <p className="text-gray-600 max-w-xl mx-auto">
        Gebruik de navigatie Link components hieronder of in de navigatie om naar de nodige pagina te surfen. 
      </p>
      <div className="flex justify-center space-x-4">
        <Link to="new" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
          Gegevens Toevoegen
        </Link>
        <Link to="answers" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition">
          Gegevens Bekijken
        </Link>
      </div>
    </div>
  );
}