import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

const Head = (props) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />

    <title>{props.title || 'PetDee Thailand'}</title>
    <meta name="author" content={props.author || 'AYA Chinese'}></meta>
    <meta name="description" content={props.description || defaultDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
    <link rel="icon" href="/static/favicon.ico" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta property="og:description" content={props.description || defaultDescription} />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    {/* <!-- Favicons --> */}
    <link rel="shortcut icon" href="/static/assets/images/favicon.ico" />
    <link rel="apple-touch-icon" href="/static/assets/images/icon.png" />

    {/* <!-- Google font (font-family: 'Roboto', sans-serif; Poppins ; Satisfy) --> */}
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Kanit:200,300,300i,400,400i,500,600,600i,700,700i,800|Prompt" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Quicksand:700,300|Montserrat" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800" rel="stylesheet" />
    {/* <!-- Stylesheets --> */}
    <link rel="stylesheet" href="/static/assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/static/assets/css/plugins.css" />
    <script src="https://d.line-scdn.net/liff/1.0/sdk.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-bdMzz1onLPXl-XDMePprOdvHFju6QhA&v=3.exp&libraries=geometry,places&language=th"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vConsole/3.2.0/vconsole.min.js" />
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
