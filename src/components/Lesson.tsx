import { CheckCircle, Lock } from 'phosphor-react';
import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps{
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessonProps){

  const { slug } = useParams<{ slug: string}>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR,
  });

  const isActiveLesson = slug == props.slug;

  return(
    <Link to={isLessonAvailable ? (`/event/lesson/${props.slug}`) : ("#")} className={isLessonAvailable ? ("group") : "group cursor-not-allowed"}>
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActiveLesson ? 'bg-green-500' : ''}`}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames("text-sm text-blue-500 font-medium flex items-center gap-2", {
              'text-white': isActiveLesson
            })}>
              <CheckCircle size={20} />
              Contéudo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className={classNames("text-xs rounded py-[0.125rem] px-2 tex-white border border-green-300 font-bold", {
            'border-white': isActiveLesson
          })}>
            {props.type == 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className={classNames('text-gray-200 mt-5 block', {
          'text-white': isActiveLesson
        })}>{props.title}</strong>
      </div>
    </Link>
  );
}