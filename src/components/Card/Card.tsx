import Heart from "../../assets/heart.svg?react";
import Calendar from "../../assets/calendar.svg?react";
interface CardProps {
  image: string;
  title: string;
  date: string;
  category: string;
}
const Card = (props: CardProps) => {
  return (
    <div className="card border-m">
      <div className="card__image">
        <div className="card__image-container" style={{ backgroundImage: `url(${props.image})` }} />
      </div>
      <div className="card__info ">
        <div className="card__info__title typo typo--truncate">{props.title}</div>
        <div className="card__info__date">
          <Calendar className="mr-s" style={{ fill: "var(--color-sky-blue)", width: "1.8rem", height: "20" }} />
          {props.date}
        </div>
        <div className="card__info__actions">
          <div className="card__info__actions__list">
            <button className="button text-electric-blue p-xs border-xl" style={{ width: "fit-content" }}>
              {props.category}
            </button>
          </div>
          <div className="card__info__actions__list">
            <button className="card__info__actions__list__item button bg-transparent">
              <Heart style={{ width: "100%", height: "100%", fill: "var(--color-sky-blue)" }} />
            </button>
            <button className="card__info__actions__list__item button bg-transparent">
              <Heart style={{ width: "100%", height: "100%", fill: "var(--color-sky-blue)" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
