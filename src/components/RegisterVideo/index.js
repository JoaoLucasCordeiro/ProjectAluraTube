import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js"

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL = 'https://ljupbwgkwsbwksmyunih.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqdXBid2drd3Nid2tzbXl1bmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNzI2MzAsImV4cCI6MTk4Mzk0ODYzMH0.Rr8pXYEdtB2eHwiy_QVtrd6XkNJyADaNVs1Nu_rGtwQ'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "https://img.youtube.com/vi/QsqatJxAUtk/hqdefault.jpg" }
    });
    const [formVisivel, setFormVisivel] = React.useState(true);
    
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
        
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);

                        supabase.from('video').insert({
                            title: formCadastro.values.title,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: 'jogos'
                        }).then((data) => {
                            console.log(data)
                        }).catch((error) => {console.log(error)})

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input
                                placeholder="Titulo do vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />
                            <input
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}
