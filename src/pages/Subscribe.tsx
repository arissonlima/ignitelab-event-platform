import { gql, useMutation, useQuery } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

const GET_EVENT_QUERY = gql`
  query ReadEvent{
  event(where: {id: "cl4sscghjheah0bkgurbhl6yt"}) {
    title
    description
    logoEvent
  }
}
`;

interface GetEventQueryResponse{
  event: {
    id: string;
    title: string;
    description: string;
    logoEvent: string;
  }
}

export function Subscribe(){

  const { data } = useQuery<GetEventQueryResponse>(GET_EVENT_QUERY);

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent){
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email
      }
    })

    navigate('/event');
  };

  return(
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            {data?.event.title}
            {/* Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">ReactJS</strong> */}
          </h1>

          <p className="mt-4 text-gray-200 leading-relaxed">
            {data?.event.description}
            {/* Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado. */}
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

          <form onSubmit={handleSubscribe} action="" className="flex flex-col gap-2 w-full">
            <input
              type="text"
              placeholder="Digite seu nome completo"
              className="bg-gray-900 rounded px-5 h-14"
              onChange={event => setName(event.target.value)}
            />
              
            <input
              type="email"
              placeholder="Digite seu email"
              className="bg-gray-900 rounded px-5 h-14"
              onChange={event => setEmail(event.target.value)}
            />

            <button disabled={loading} type="submit" className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <img src="./src/assets/code-mockup.png" className="mt-10" alt="" />
    </div>
  );
}