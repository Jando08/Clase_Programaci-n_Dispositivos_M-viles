async function obtenerUsuarios() {

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "Cargando usuarios...";

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const usuarios = await response.json();

        resultado.innerHTML = "";

        usuarios.forEach(usuario => {

            resultado.innerHTML += `
                <div>
                    <h3>${usuario.name}</h3>
                    <p>Email: ${usuario.email}</p>
                    <p>Ciudad: ${usuario.address.city}</p>
                    <hr>
                </div>
            `;

        });

    } catch (error) {

        resultado.innerHTML = "Ocurrió un error";

        console.error(error);

    }

}

/*
console.log("Aplicación iniciada");

console.log("Ancho: 40", window.innerWidth);
console.log("Alto: 20", window.innerHeight);

alert("Bienvenidos a la práctica");
window.alert("Hola estudiantes");

function ejecutarWindow() {

    let nombre = prompt("Escribe tu nombre");

    alert("Bienvenido " + nombre);

    console.log("Nombre:", nombre);
}

setTimeout(() => {
    console.log("Mensaje después de 3 segundos");
}, 3000);

function obtenerUsuarios() {

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {

            console.log(data);

        })
        .catch(error => {

            console.error("Error:", error);

        });

}


const estudiante = {
    nombre: "Pedro",
    edad: 22,
    carrera: "Ingeniería de Software",
    materias: [
        "JavaScript",
        "React Native",
        "Bases de Datos"
    ]
};

const estudianteJSON = JSON.stringify(estudiante);

console.log(estudianteJSON);
// Después convertir nuevamente:
const estudianteObjeto = JSON.parse(estudianteJSON);

console.log(estudianteObjeto);
console.log(estudianteObjeto.nombre);
console.log(estudianteObjeto.materias);
*/