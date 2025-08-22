import React from "react";
import { X, Linkedin, Instagram } from "lucide-react";

interface LocalAtendimento {
	nome: string;
	endereco: string;
	cidade: string;
}

interface Formacao {
	titulo: string;
	instituicao: string;
	ano: string;
}

interface Experiencia {
	cargo: string;
	local: string;
	periodo: string;
	descricao: string;
}

interface Profissional {
	nome: string;
	especialidade: string;
	status: string;
	codigo: string;
	criancasAtendidas: number;
	dataIngresso: string;
	sobre: string;
	formacao: Formacao[];
	experiencias: Experiencia[];
	locais: LocalAtendimento[];
	areas: string[];
	redes: { linkedin?: string; instagram?: string };
	avatar?: string;
}

interface ModalPerfilProfissionalProps {
	open: boolean;
	onClose: () => void;
	profissional: Profissional;
}

const coresChips = [
	"bg-green-50 text-green-700 border-green-200",
	"bg-green-100 text-green-800 border-green-300",
	"bg-green-50 text-green-700 border-green-200",
	"bg-green-100 text-green-800 border-green-300",
];

export default function ModalPerfilProfissional({ open, onClose, profissional }: ModalPerfilProfissionalProps) {
	if (!open) return null;

	// Avatar com iniciais
	const getInitials = (nome: string) => {
		return nome
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
			<div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
				{/* Botão fechar */}
				<button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
					<X size={28} />
				</button>

				{/* Header */}
				<div className="flex items-center gap-4 border-b pb-6 mb-6">
					<div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
						{getInitials(profissional.nome)}
					</div>
					<div>
						<div className="flex items-center gap-2">
							<span className="text-2xl font-bold text-gray-900">{profissional.nome}</span>
						</div>
						<div className="flex gap-2 mt-1">
							<span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">{profissional.especialidade}</span>
							<span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">{profissional.status}</span>
						</div>
					</div>
				</div>

				{/* Botão mensagem */}
				<div className="mb-6">
					<button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-500 text-white font-semibold text-base shadow hover:bg-green-600">
						<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
						Enviar Mensagem
					</button>
				</div>

				{/* Grid principal */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Coluna esquerda */}
					<div className="flex flex-col gap-6">
						{/* Sobre */}
						<div className="bg-white border rounded-xl p-5">
							<h3 className="font-bold text-lg mb-2">Sobre</h3>
							<p className="text-gray-700 text-base">{profissional.sobre}</p>
						</div>
						{/* Formação */}
						<div className="bg-white border rounded-xl p-5">
							<h3 className="font-bold text-lg mb-4 flex items-center gap-2">
								<span className="inline-block text-green-600">
									<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-6m0 0V4m0 10l-3-3m3 3l3-3"/></svg>
								</span>
								Formação Acadêmica
							</h3>
							{profissional.formacao.map((f, i) => (
								<div key={i} className="mb-3">
									<div className="font-semibold text-green-700">{f.titulo}</div>
									<div className="text-gray-700 text-sm">{f.instituicao}</div>
									<div className="text-gray-400 text-xs">{f.ano}</div>
								</div>
							))}
						</div>
						{/* Experiências */}
						<div className="bg-white border rounded-xl p-5">
							<h3 className="font-bold text-lg mb-4 flex items-center gap-2">
								<span className="inline-block text-green-600">
									<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 17v-2a4 4 0 0 1 8 0v2"/><circle cx="12" cy="7" r="4"/></svg>
								</span>
								Experiências Principais
							</h3>
							{profissional.experiencias.map((exp, i) => (
								<div key={i} className="mb-3">
									<div className="font-semibold text-green-700">{exp.cargo}</div>
									<div className="text-gray-700 text-sm">{exp.local}</div>
									<div className="text-gray-400 text-xs">{exp.periodo}</div>
									<div className="text-gray-600 text-sm mt-1">{exp.descricao}</div>
								</div>
							))}
						</div>
					</div>

					{/* Coluna direita */}
					<div className="flex flex-col gap-6">
						{/* Informações */}
						<div className="bg-white border rounded-xl p-5">
							<h3 className="font-bold text-lg mb-4">Informações</h3>
							<div className="mb-2">
								<span className="text-gray-600 text-sm">Código de Identificação</span><br />
								<span className="font-mono font-bold text-gray-900">{profissional.codigo}</span>
							</div>
							<div className="mb-2">
								<span className="text-gray-600 text-sm">Crianças atendidas</span><br />
								<span className="font-bold text-gray-900">{profissional.criancasAtendidas}</span>
							</div>
							<div>
								<span className="text-gray-600 text-sm">Data de ingresso</span><br />
								<span className="font-bold text-gray-900">{profissional.dataIngresso}</span>
							</div>
						</div>
						{/* Locais de atendimento */}
						<div className="bg-white border rounded-xl p-5">
							<h3 className="font-bold text-lg mb-4 flex items-center gap-2">
								<span className="inline-block text-green-600">
									<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
								</span>
								Locais de Atendimento
							</h3>
							{profissional.locais.map((l, i) => (
								<div key={i} className="mb-2 bg-gray-50 rounded p-2">
									<div className="font-semibold text-gray-900">{l.nome}</div>
									<div className="text-gray-600 text-xs">{l.endereco}</div>
									<div className="text-gray-400 text-xs">{l.cidade}</div>
								</div>
							))}
						</div>
						{/* Áreas de atuação */}
						<div className="bg-white border rounded-xl p-5">
							<h3 className="font-bold text-lg mb-4">Áreas de Atuação</h3>
							<div className="flex flex-wrap gap-2">
								{profissional.areas.map((area, i) => (
									<span key={i} className={`px-3 py-1 rounded-full border text-xs font-semibold ${coresChips[i % coresChips.length]}`}>{area}</span>
								))}
							</div>
						</div>
						{/* Redes sociais */}
						<div className="bg-white border rounded-xl p-5">
							<h3 className="font-bold text-lg mb-4">Redes Sociais</h3>
							<div className="flex gap-3">
								{profissional.redes.linkedin && (
									<a href={profissional.redes.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 bg-blue-50 rounded-full p-2 hover:bg-blue-100">
										<Linkedin className="w-5 h-5" />
									</a>
								)}
								{profissional.redes.instagram && (
									<a href={profissional.redes.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 bg-pink-50 rounded-full p-2 hover:bg-pink-100">
										<Instagram className="w-5 h-5" />
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
