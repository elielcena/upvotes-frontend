import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  MouseEvent,
} from 'react';
import { format, getDate, getMonth, isToday, getYear } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Carousel from 'react-elastic-carousel';

import { toast } from 'react-toastify';
import {
  Container,
  Content,
  ContentHeader,
  CalendarMonth,
  Month,
  CalendarDay,
  Day,
  IPosts,
  Post,
} from './styles';

import api from '../../services/api';

import IPost from '../../interfaces/posts';

import ModalCreatePost from '../../components/ModalCreatePost';
import LoadingDays from '../../components/Loadings/LoadDays';
import LoadPosts from '../../components/Loadings/LoadPosts';

import { colorPrimary, colorGrayLight } from '../../styles/colors';
import Avatar from '../../components/Avatar';

interface IDaysOfMonth {
  day: number;
  number: string;
  name: string;
}

interface ISelectDate {
  day?: number;
  month?: number;
  year?: number;
}

const Dashboard: React.FC = () => {
  const constraintsRef = useRef(null);

  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState([
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]);
  const [post, setPost] = useState<IPost[]>([]);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [daysOfMonth, setDaysOfMonth] = useState<IDaysOfMonth[]>([]);
  const [loadDaysOfMonth, setLoadDaysOfMonth] = useState(false);

  const [loadPosts, setLoadPosts] = useState(false);

  const [yearSelected, setYearSelected] = useState(
    getYear(new Date()) - (getYear(new Date()) - 10),
  );
  const [monthSelected, setMonthSelected] = useState(getMonth(new Date()) + 1);
  const [daySelected, setDaySelected] = useState(getDate(new Date()));

  const [openModalCreatePost, setOpenModalCreatePost] = useState(false);

  const handleOpenModal = useCallback(() => {
    const body = document.querySelector('body');
    body?.classList.add('modal-open');
    setOpenModalCreatePost(true);
  }, []);

  const handleCloseModal = useCallback((event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const close = target.getAttribute('id');

    if (close) {
      setOpenModalCreatePost(false);
      const body = document.querySelector('body');
      body?.classList.remove('modal-open');
    }
  }, []);

  const dateSeletedText = useMemo(() => {
    const today = isToday(dateSelected) ? 'Hoje' : '';
    const result = format(dateSelected, "dd 'de' MMMM", {
      locale: pt,
    });

    return `${today} | ${result}`;
  }, [dateSelected]);

  async function handleSelectPostDate({ day, month, year }: ISelectDate) {
    if (day) {
      setDaySelected(day);
    }

    if (month) {
      setMonthSelected(month);
    }

    if (year) {
      setYearSelected(year);
    }
  }

  const daysInMonth = (month: number, year: number) => {
    const days = new Date(year, month, 0).getDate();

    return Array.from({ length: days }, (_, index) => index + 1);
  };

  const loadPost = async () => {
    setLoadPosts(true);
    try {
      const { data } = await api.get(`posts?data=${dataSelected()}`);
      setPost(data);
    } catch (err) {
      toast.error('Erro ao carregar postagens!');
    } finally {
      setLoadPosts(false);
    }
  };

  const updatePost = async (p: IPost) => {
    try {
      await api.put('posts/upVotes', {
        idpost: p.id,
        operacao: 'ADD',
      });
      loadPost();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    setLoadDaysOfMonth(true);
    const daysFormatted = daysInMonth(
      monthSelected,
      yearSelectedFormated(),
    ).map(day => {
      return {
        day: Number(day),
        number: String(day).padStart(2, '0'),
        name: format(
          new Date(yearSelectedFormated(), monthSelected - 1, day),
          'E',
          { locale: pt },
        ),
      };
    });

    setDaysOfMonth(daysFormatted);
    loadPost();
    setLoadDaysOfMonth(false);
  }, [yearSelected, monthSelected, daySelected, post.length]);

  useEffect(() => {
    const data = new Date();
    let ano = data.getFullYear() - 10;
    while (ano <= data.getFullYear()) {
      years.push(ano);
      ano += 1;
    }
  }, []);

  const dataSelected = () => {
    return `${yearSelectedFormated()}-${monthSelected}-${daySelected}`;
  };

  const yearSelectedFormated = () => {
    return yearSelected + (getYear(new Date()) - 10);
  };

  const renderItem = (p: IPost) => {
    return (
      <>
        <Post>
          <span>
            <Avatar size={45} />
            <span>{`@${p.username.replace(' ', '').toLowerCase()}`}</span>
          </span>
          <div>
            <div className="left">
              <div>
                <strong>{p.titulo}</strong>
                {p.descricao.split('<br/>').map((item, key) => {
                  return <p>{item.replace('<br/>', '')}</p>;
                })}
              </div>
            </div>

            <div className="right">{p.datagravacao.split(' ')[1]}</div>
          </div>
        </Post>
        <div>
          <button
            type="button"
            onClick={() => updatePost(p)}
            style={{
              background: 'none',
              border: 'none',
            }}
          >
            <img
              src="https://media0.giphy.com/media/mC6hhEZC2kLUfRIPsf/giphy.gif?cid=ecf05e4785a3bef4081ef11773ee1b3cfb50499b911c00d7&rid=giphy.gif"
              alt="like"
              width={110}
            />
          </button>
          <strong>{p.upvotes}</strong>
        </div>
      </>
    );
  };

  return (
    <Container>
      <Content>
        <ContentHeader>
          <div>
            <h1>Postagens</h1>
            <p>{dateSeletedText}</p>
          </div>

          <button
            type="button"
            onClick={handleOpenModal}
            style={{ color: colorGrayLight, backgroundColor: colorPrimary }}
          >
            + Nova Postagem
          </button>
        </ContentHeader>

        <CalendarMonth
          initialFirstItem={yearSelected}
          itemsToScroll={4}
          itemPadding={[0, 0]}
          itemsToShow={7}
        >
          {years.map((year: number, index: number) => (
            <Month
              key={year}
              selected={index === yearSelected}
              onClick={() => {
                handleSelectPostDate({ year: index });
              }}
            >
              {year}
            </Month>
          ))}
        </CalendarMonth>

        <CalendarMonth
          initialFirstItem={monthSelected}
          itemsToScroll={4}
          itemPadding={[0, 0]}
          itemsToShow={7}
        >
          {months.map((month: string, index: number) => (
            <Month
              key={month}
              selected={index + 1 === monthSelected}
              onClick={() => handleSelectPostDate({ month: index + 1 })}
            >
              {month}
            </Month>
          ))}
        </CalendarMonth>

        {loadDaysOfMonth && <LoadingDays />}

        <CalendarDay isLoading={loadDaysOfMonth}>
          <Carousel
            initialFirstItem={daySelected - 2}
            itemsToScroll={7}
            itemPadding={[0, 0]}
            itemsToShow={12}
          >
            {daysOfMonth.map(({ number, day, name }: IDaysOfMonth) => (
              <Day
                key={number}
                selected={day === daySelected}
                onClick={() => handleSelectPostDate({ day })}
              >
                <strong>{number}</strong>
                <span>{name}</span>
              </Day>
            ))}
          </Carousel>
          <div>
            <span style={{ fontSize: 10 }}>
              Arraste para direta para visualizar meses / dias anteriores
            </span>
          </div>
        </CalendarDay>

        {loadPosts && <LoadPosts />}

        <IPosts ref={constraintsRef} isLoading={loadPosts}>
          {post.map((p: IPost, index: number) => renderItem(p))}
        </IPosts>
      </Content>

      <ModalCreatePost
        post={post}
        onClick={(event: MouseEvent<HTMLElement>) => handleCloseModal(event)}
        open={openModalCreatePost}
      />
    </Container>
  );
};

export default Dashboard;
