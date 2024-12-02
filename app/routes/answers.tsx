import { LoaderFunctionArgs, ActionFunctionArgs  } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { Trash2 } from "lucide-react";

const prisma = new PrismaClient();

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const answers = await prisma.answer.findMany();
  return { answers };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = Number(formData.get("id"));

  try {
    await prisma.answer.delete({
      where: { id }
    });
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete record" };
  }
};

export default function Answers() {
  const { answers } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verzamelde Gegevens</h2>
        <p className="text-gray-600">Hier vind je een overzicht van alle ingevoerde persoonlijke informatie.</p>
      </div>
      
      {answers.length === 0 ? (
        <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500 text-yellow-800">
          Geen gegevens gevonden. Voeg eerst gegevens toe via 'Voeg Nieuw Toe'.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {answers.map((answer) => (
            <div 
              key={answer.id} 
              className="bg-white p-5 rounded-lg shadow-md border hover:shadow-lg transition relative"
            >
              <Form method="post" className="absolute top-2 right-2">
                <input type="hidden" name="id" value={answer.id} />
                <button 
                  type="submit" 
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={20} />
                </button>
              </Form>
              <h3 className="font-semibold text-xl text-gray-800 mb-2 border-b pb-2">{answer.name}</h3>
              <p className="text-gray-600">{answer.hobbies}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}