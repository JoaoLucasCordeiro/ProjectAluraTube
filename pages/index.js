import React from "react"
import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"

function HomePage() {
   
    const [filterValue, setFilterValue] = React.useState('')
    
    return (
        <>
            <CSSReset />
            <div>
                <Menu filterValue={filterValue} setFilterValue={setFilterValue}/>
                <Banner />
                <Header />
                <Timeline searchValue={filterValue} playlists={config.playlists} />
            </div>
        </>
    )
}

export default HomePage

const StyledHeader = styled.div`
  
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 1rem;
    }
  
  `
function Header() {
    return (
        <StyledHeader>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>

        </StyledHeader>
    )
}

const StyledBanner = styled.div`
.banner {
    margin-top: 3.5rem;
    height: 230px;
    background-image: url(https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
`
function Banner() {
    return (
        <StyledBanner>
            <div className="banner">
                
            </div>
        </StyledBanner>
    )
}


function Timeline({searchValue, ...props}) {

    const playlistNames = Object.keys(props.playlists)

    return (
        <StyledTimeline>

            {playlistNames.map((playlistName) => {

                const videos = props.playlists[playlistName]
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase()
                                const searchValueNormalized = searchValue.toLowerCase()
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>{video.title}</span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )

            })}

        </StyledTimeline>
    )
}

