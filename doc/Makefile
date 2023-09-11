FILE=main

all: $(FILE).pdf

$(FILE).pdf: $(FILE).tex $(FILE).bbl $(FILE).blg
    pdflatex $(FILE).tex
    pdflatex $(FILE).tex

$(FILE).bbl $(FILE).blg: $(FILE).bcf
    biber $(FILE)

$(FILE).bcf: $(FILE).tex
    pdflatex $(FILE).tex

clean:
    del $(FILE).aux $(FILE).bbl $(FILE).blg $(FILE).log $(FILE).bcf $(FILE).run.xml
