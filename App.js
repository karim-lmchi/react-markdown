import React, { Component } from 'react';
import './App.css';
import {sampleText} from './sampleText'

// import de la librairie de traduction de markdown
import marked from "marked"

class App extends Component {

  // instanciation de l'état local
  state = {
    text : sampleText
  }

  // Permet de gérer l'état de nos components au chargement de la page
  componentDidMount() {
    // Récupération de la valeur de text tel qu'il a été stocké en local
    const text = localStorage.getItem( 'text' )

    // Si text n'est pas vide
    if(text) { // alors il affiche son contenu
      this.setState ({ text })
    } else { // sinon il revient à son état initial
      this.setState ({ text : sampleText })
    }
    
  }

  // Permet de gérer l'état de nos components après une MAJ
  componentDidUpdate() {
    // localStorage nous permet de stocker localement nos valeurs
    // getItem permet de récupérer une donnée stocké localement
    // ( ce que l'on récupére )
    const { text } = this.state

    // localStorage nous permet de stocker localement nos valeurs
    // setItem permet d'enregistrer une donnée
    // ( ce que l'on récupére, sa valeur)
    localStorage.setItem( 'text', text )
  }

  // Fonction qui permet de modifier le contenu du textarea
  handleChange = (event) => {
    // cible la value de l'élément dans lequel l'event a été appelé
    const text = event.target.value

    // Changement de l'état de text
    this.setState ({ text })
  }

  // Fonction qui gére le rendu html
  // marked(ce que l'on veut modifier, options)
  // l'option sanitize empèche l'utilisateur de taper des balises html dans le textarea
  renderText = text => marked( text, { sanitize : true } )

  render() {

    const { text } = this.state

    return ( 

      // Gestion des dimensions des blocs grâce à bootstrap
      <div className = "container">
        <div className = "row">

          {/* Bloc contenant le markdown */}
          <div className = "col-md-6">
            <textarea className = "form-control"
                      rows = "35"
                      value = { text }
                      onChange = { this.handleChange } >
            </textarea>
          </div>

          {/* Bloc contenant le résultat à l'affichage du markdown */}
          <div className = "col-md-6">

            {/*
            dangerouslySetInnerHTML indique que les données sont créés par l'utilisateur du site et non le Dev
            elle a comme valeur un objet qui à une propriété __html dont la valeur est
            la fonction renderText qui à pour paramètre l'état local de text 
            */}
            <div dangerouslySetInnerHTML = {{ 
                 __html : this.renderText(text) }}
            >
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
