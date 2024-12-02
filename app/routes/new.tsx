import { Form, useActionData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

const prisma = new PrismaClient();

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const hobbies = formData.get("hobbies") as string;

  try {
    await prisma.answer.create({
      data: { name, hobbies }
    });
    return redirect("/answers");
  } catch (error) {
    return { error: "Failed to submit answer" };
  }
};

export default function New() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex flex-col space-y-6">
    <div className="bg-blue-50 p-2 rounded-md border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Verzamel Gegevens</h2>
        <p className="text-gray-600">Hier kan je als gebruiker je naam en hobby opgeven.</p>
    </div>
    <div className="flex items-center justify-center bg-gray-100 p-2">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Voeg hier een nieuw antwoord toe</h2>
        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Naam
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700">
              Hobbies
            </label>
            <input
              id="hobbies"
              name="hobbies"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></input>
          </div>
          {actionData?.error && (
            <div className="text-red-500">{actionData.error}</div>
          )}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Toevoegen
            </button>
          </div>
        </Form>
      </div>
    </div>
    </div>
  );
}