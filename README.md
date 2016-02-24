BELLA Project
=============

* Biblioteca Electrónica de Libros Libres para el Aprendizaje
* Biblioteca Eletrônica de Livros Livres para o Aprendizado
* Bibliothèque Électronique de Livres Libres pour l'Apprentissage
* Biblioteca Elettronica di Libros Liberos per l'Apprendimento

Description
-----------

The goal of the project is to create ebooks for education,
especially in scientific domains where mathematical notations are needed. The
ebooks rely on Web technologies supported by
[Gecko](https://developer.mozilla.org/en-US/docs/Mozilla/Gecko)
to provide interactive and accessible materials that can be read from mobile
devices, as experimented with the
[Mathematics in Ebooks](http://www.ulule.com/mathematics-ebooks/) project.

The ebooks are licensed under the free license
[CC BY-SA](http://creativecommons.org/licenses/by-sa/4.0/) and most of
them are freely downloadable from mobile market places so that they are
available to the greatest number of students and teachers and the content can
be easily shared and reused.

Initial Focus
-------------

* **K-12 education** (more precisely secondary education) and scientific domains
  (mathematics, physics, etc).

* **FirefoxOS Web apps**. There does not seem to have any ebook
  market place or default EPUB reader with Javascript support in FirefoxOS at
  the moment. Moreover, FirefoxOS Web apps can be slightly more general than
  interactive ebooks.

* **Countries where [FirefoxOS devices are available](https://www.mozilla.org/firefox/os/devices/)**, with priority to Latin countries (where the acronym BELLA
  is translatable!) that have the
  [largest population](https://en.wikipedia.org/wiki/List_of_countries_by_population). We try to follow as much as possible the official
  education programs of each country and prioti

* **FirefoxOS, Android** and other platforms where Gecko and FirefoxOS Web
  apps can be used.

Official Programs
-----------------

* India (population: 1,260,400,000)

* USA (population: 318,844,000)

* Brazil (population: 202,656,788)

  In Brazil the basic education is responsibility of states and cities.
  We use [Currículo do Estado de São Paulo: Matemática e suas Tecnologias](http://www.educacao.sp.gov.br/a2sitebox/arquivos/documentos/238.pdf)

* Bangladesh (population: 157,075,000)

* Russia (population: 146,149,200)

* Mexico (population: 119,713,203)
   * [Programas de estudio de educación media superior](http://www.dgb.sep.gob.mx/02-m1/03-iacademica/programasdeestudio.php)

* Philippines (population: 100,617,630)

* Germany (population: 80,781,000)

* France (population: 66,019,000)
  * [Programme du collège](http://www.education.gouv.fr/cid81/les-programmes.html)
  * [Programme du Lycée](http://eduscol.education.fr/pid26017/programmes-du-lycee.html)

* United Kingdom (population: 64,105,654)

* Italy (population: 60,780,377)

* Colombia (population: 47,801,700)
  * [Estándares Básicos de Competencias en Lenguaje, Matemáticas, Ciencias y Ciudadanas](http://www.mineducacion.gov.co/cvn/1665/article-116042.html)

* Spain (population: 46,507,800)

* Poland (population: 38,496,000)

* Venezuela (population: 30,206,307)
  * [Coleccion Bicentenario - Media](http://www.me.gob.ve/coleccion_bicentenario/pdf/media/)

* Peru (population: 30,814,175)
  * [Educación Secundaria](http://ebr.minedu.gob.pe/pdfs/dcn2009_III_secundaria.pdf)

* Australia (population: 23,679,600)

* Chile (population: 17,819,054)
  * [Programas de Estudio](http://www.mineduc.cl/index5_int.php?id_portal=47&id_contenido=17116&id_seccion=3264&c=10)

* Guatemala (population: 15,806,675)

* Belgium (population: 11,207,699)

* Greece (population: 10,992,589)

* Czech Republic (population: 10,521,600)

* Hungary (population: 9,879,000)

* Switzerland (population: 8,183,800)

* Serbia (population: 7,146,759)

* El Salvador (population: 6,401,240)

* Nicaragua (population: 6,071,045)

* Panama (population: 3,713,312)

* Uruguay (population: 3,404,189)
  * [CES - Planes y Programas](http://www.ces.edu.uy/ces/index.php?option=com_content&view=category&layout=blog&id=40&Itemid=71)

* Macedonia (population: 2,065,769)

* Montenegro (population: 620,029)

* Luxembourg (population: 549,700)

Build Instructions
------------------

### Dependencies

- [coreutils](https://www.gnu.org/software/coreutils/), [sed](https://www.gnu.org/software/sed/), [make](https://www.gnu.org/software/make/), [wget](https://www.gnu.org/software/wget/), find, zip, unzip, [grep](https://www.gnu.org/software/grep/grep.html).

- [TeXZilla](https://github.com/fred-wang/TeXZilla).
  You can install it with the command `sudo npm install texzilla -g`.

- [XeLaTeX](http://www.xelatex.org/).

- [LaTeXML](https://github.com/brucemiller/LaTeXML). It is best to use the
  development version, where many bugs are fixed.

#### Debian-based Linux distributions

Install the dependencies with the command

    sudo apt-get install coreutils sed make wget findutils zip unzip grep texlive-xetex npm git

and TeXZilla via npm:

    sudo npm install texzilla -g

Finally, install the [prerequisites for LaTeXML](http://dlmf.nist.gov/LaTeXML/get.html#SS2.SSS0.P2), get [LaTeXML from GitHub](http://dlmf.nist.gov/LaTeXML/get.html#SS7) and follow the [build instructions](http://dlmf.nist.gov/LaTeXML/get.html#SS6.SSS0.P2).

#### Mac (not tested)

Install [MacPorts](https://www.macports.org/install.php) so that you can
install the dependencies with the command

    sudo port install coreutils gsed gmake wget findutils zip unzip grep texlive-xetex npm git

and TeXZilla via npm:

    sudo npm install texzilla -g

Finally, install the [prerequisites for LaTeXML](http://dlmf.nist.gov/LaTeXML/get.html#SS3.SSS0.P2), get [LaTeXML from GitHub](http://dlmf.nist.gov/LaTeXML/get.html#SS7) and follow the [build instructions](http://dlmf.nist.gov/LaTeXML/get.html#SS6.SSS0.P2).

#### Windows (not tested)

Use [Cygwin](http://cygwin.com/).

### Build Commands

Once you cloned the BELLA-dev repository and moved into its directory. You can
build the Firefox OS webapps, with

      ./configure
      make all

Building all the apps might take some time. To build only one app
(e.g. Tritangulo), you can do:

      make webapps/Tritangulo.zip

You can also extract the zip files into the webapps/ directory using

      make extract

so that you can open the Web apps in your browser or from the
[FirefoxOS app manager](about:app-manager). This command will also add a fake
receipt verifier for paid apps.

LaTeXML may be slow to generate ebooks from LaTeX. However, you can use XeTeX
to generate pdf files in the pdf/ directory in order to preview them quickly:

      make pdf
