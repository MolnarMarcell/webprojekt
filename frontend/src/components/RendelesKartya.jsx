export default function RendelesKartya({ vevo }) {
            return (
                    <div>
                        <h3>Vevő id: {vevo.vevo_id}</h3>
                        <p>Termék id: {vevo.termek_id}</p>
                        <p> Mennyiség: {vevo.mennyiseg}</p>
                         <p>Dátum: {vevo.rendeles_ideje}</p>
                    </div>
            );
        }