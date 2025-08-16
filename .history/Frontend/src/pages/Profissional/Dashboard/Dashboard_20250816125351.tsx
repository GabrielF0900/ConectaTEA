export default function Dashboard() {
  return null; // Placeholder for future content
}
            </li>
          </ul>
        </div>

        {/* Metas em andamento */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Metas em Andamento</h3>
            <button className="bg-green-500 text-white px-3 py-1 rounded">Nova Meta</button>
          </div>

          <ul className="space-y-4">
            <li>
              <p className="font-semibold">Ana Silva</p>
              <p className="text-sm text-gray-500">Melhorar comunicação verbal</p>
              <div className="w-full bg-gray-200 rounded h-2 mt-2">
                <div className="bg-green-500 h-2 rounded w-[85%]"></div>
              </div>
            </li>
            <li>
              <p className="font-semibold">João Pedro</p>
              <p className="text-sm text-gray-500">Desenvolver habilidades sociais</p>
              <div className="w-full bg-gray-200 rounded h-2 mt-2">
                <div className="bg-green-500 h-2 rounded w-[60%]"></div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
