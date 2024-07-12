import { Modal, Spin } from 'antd'
import { Character } from '../../model/Character'
import './DetailModal.style.scss'
import { extractId } from '../card/Card'
import { useEffect, useState } from 'react'
import { Planet } from '../../model/Planet'
import axios from 'axios'
import Loading from '../Loading'
import { LoadingOutlined } from '@ant-design/icons'
import { renderColor } from '../../utils/SpeciesColors'
export default function DetailModal({
  data,
  open,
  setOpen,
}: {
  data: Character | null
  open: boolean
  setOpen: any
}) {
  const [planet, setPlanet] = useState<Planet | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const fetchHomeworld = async (url: string) => {
    try {
      setLoading(true)
      const resp = await axios.get(url)
      if (resp.status === 200) {
        setPlanet(resp.data)
        setLoading(false)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(data)
    if (data && data.homeworld) {
      fetchHomeworld(data.homeworld)
    }
  }, [data])

  return (
    <Modal
      width={600}
      title={<p className="title">{data?.name}</p>}
      open={open}
      footer={null}
      onCancel={() => setOpen(false)}
      destroyOnClose
    >
      <div className="modal-wrapper">
        {loading ? (
          <Spin
            className="small-spinner"
            indicator={<LoadingOutlined style={{ fontSize: '40px' }} />}
            size="large"
          />
        ) : (
          <div className={`body ${!loading && 'animation'}`}>
            {data?.url && extractId(data?.url) && (
              <img
                className="body__img"
                alt=""
                src={`people/${extractId(data?.url)}.jpg`}
                style={{
                  border: `2px solid ${
                    data.species[0]
                      ? renderColor(extractId(data.species[0]))
                      : '#000'
                  }`,
                }}
              />
            )}
            <div className="body__info">
              <div className="body__info__item">
                <p className="body__info__item__title">Height: </p>
                <p className="body__info__item__data">
                  {data?.height ? `${Number(data?.height) / 100} m` : 'UNKNOWN'}{' '}
                </p>
              </div>

              <div className="body__info__item">
                <p className="body__info__item__title">Mass: </p>
                <p className="body__info__item__data">
                  {data?.mass ? `${Number(data?.mass)} kg` : 'UNKNOWN'}{' '}
                </p>
              </div>

              <div className="body__info__item">
                <p className="body__info__item__title">Birth Year: </p>
                <p className="body__info__item__data">
                  {data?.birth_year ? data?.birth_year : 'UNKNOWN'}{' '}
                </p>
              </div>

              <div className="body__info__item">
                <p className="body__info__item__title">Gender: </p>
                <p
                  className="body__info__item__data"
                  style={{ textTransform: 'uppercase' }}
                >
                  {data?.gender ? data?.gender : 'UNKNOWN'}{' '}
                </p>
              </div>

              {planet && (
                <>
                  <div className="body__info__item">
                    <p className="body__info__item__title">Homeworld: </p>
                    <p className="body__info__item__data">
                      {planet?.name ? planet?.name : 'UNKNOWN'}{' '}
                    </p>
                  </div>

                  <div className="body__info__item">
                    <p className="body__info__item__title">Rotation Period: </p>
                    <p className="body__info__item__data">
                      {planet?.rotation_period
                        ? planet?.rotation_period
                        : 'UNKNOWN'}{' '}
                    </p>
                  </div>

                  <div className="body__info__item">
                    <p className="body__info__item__title">Orbital Period: </p>
                    <p className="body__info__item__data">
                      {planet?.orbital_period
                        ? planet?.orbital_period
                        : 'UNKNOWN'}{' '}
                    </p>
                  </div>

                  <div className="body__info__item">
                    <p className="body__info__item__title">Diameter: </p>
                    <p className="body__info__item__data">
                      {planet?.diameter ? `${planet?.diameter} km` : 'UNKNOWN'}{' '}
                    </p>
                  </div>

                  <div className="body__info__item">
                    <p className="body__info__item__title">Climate: </p>
                    <p
                      className="body__info__item__data"
                      style={{ textTransform: 'uppercase' }}
                    >
                      {planet?.climate ? planet?.climate : 'UNKNOWN'}{' '}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
