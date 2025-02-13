export default function SendComment() {
    return(
        <form  className="align-middle post rounded-lg h-20 px-2 py-1 mt-4 text-sm border-0 bg-gray-800 focus:ring-0 text-white placeholder-gray-400">
            <textarea  className="post w-full h-full bg-gray-800" placeholder="Escriba aquí su comentario"></textarea>
        </form>
    )
}