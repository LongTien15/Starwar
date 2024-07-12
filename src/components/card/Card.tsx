import { Card } from 'antd'
import { Character } from '../../model/Character'
import './Card.style.scss'
import { renderColor, SPECIES_COLORS } from '../../utils/SpeciesColors'

export const extractId = (url: string) => {
  console.log(url)
  const splitted = url.split('/')
  const idString = splitted[splitted.length - 2]
  try {
    const id = Number(idString)
    return id
  } catch (error) {
    return null
  }
}

export default function CharacterCard({ data }: { data: Character }) {
  return (
    <div className="card">
      {extractId(data?.url) && (
        <img
          className="card__img"
          alt=""
          src={`people/${extractId(data?.url)}.jpg`}
          style={{
            border: `2px solid ${
              data.species[0] ? renderColor(extractId(data.species[0])) : '#000'
            }`,
          }}
        />
      )}
      <div className="card__wrapper">
        <p className="card__wrapper__name">{data?.name}</p>
      </div>
    </div>
  )
}
