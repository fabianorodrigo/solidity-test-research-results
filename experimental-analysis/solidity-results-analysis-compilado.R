rm(list=ls()) #limpa aba "Environment"
cat("\014") #limpa console
#getwd() #pegar a pasta corrente (área de trabalho)
#install.packages("ggplot2")
library(ggplot2)

library(tidyverse)

sumario <- read_delim("sintese_result_com_original.csv",";")

resultOriginal <- result %>% select(Cobertura = original) %>% mutate(origem = 'Original', cor = 'setosa')
#tail(resultOriginal)
resultPesquisa <- result %>% select(Cobertura = media)  %>% mutate(origem = 'Pesquisa', cor='versicolor')
histogram<-rbind(resultOriginal,resultPesquisa)
#g <- ggplot(histogram, aes(x=Cobertura)) + 
#  labs(X = "Cobertura") +
#  geom_histogram(data = subset(histogram,original == 1), fill = "red", alpha = 0.2, binwidth = 5, position="identity") + 
#  geom_histogram(data = subset(histogram,original == 0), fill = "blue", alpha = 0.2, binwidth=5, position="identity") 
#g
#ggsave(filename = 'histograma.png', plot = g, device = png(), dpi="retina", width=15,height=9)
#histogram %>% print (n = 100)

plot_multi_histogram <- function(df, feature, label_column) {
  plt <- ggplot(df, aes(x=eval(parse(text=feature)), fill=eval(parse(text=label_column)))) +
    geom_histogram(alpha=0.7, position="stack", aes(y = ..count..), color="black", binwidth = 5) +
    geom_density(alpha=0.7) +
    geom_vline(aes(xintercept=mean(eval(parse(text=feature)))), color="black", linetype="dashed", size=1) +
    labs(x=feature, y = "Quantidade de Projetos")
  plt + guides(fill=guide_legend(title=label_column))
}

g2 <- plot_multi_histogram(histogram, 'Cobertura', 'cor')
ggsave(filename = 'histograma.png', plot = g2, device = png(), dpi="retina", width=15,height=9)

iris
