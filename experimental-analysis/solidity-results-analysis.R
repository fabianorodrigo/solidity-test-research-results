rm(list=ls()) #limpa aba "Environment"
cat("\014") #limpa console
#getwd() #pegar a pasta corrente (área de trabalho)
#install.packages("ggplot2")
library(ggplot2)

library(tidyverse)

result <- read_delim("branchCoverage.csv",";")
summary(result)
tail(result)

# Gerando CSV com sintese dos resultados (minimo, media, mediana, desvio padrao, maximo)
sintese <- result %>% group_by(project,original) %>% summarize(conta = n(), minimo = min(percentual), media = mean(percentual), desvio=sd(percentual), mediana = median(percentual), maximo=max(percentual)) %>% print(n=80)
write.csv(sintese, "sintese_result.csv")

# result %>% transform(supera=percentual > original)

# Gerando CSV com sintese dos resultados (minimo, media, mediana, desvio padrao, maximo)
sintese <- result %>% group_by(project,original) %>% summarize(conta = n(), minimo = min(percentual), media = mean(percentual), desvio=sd(percentual), mediana = median(percentual), maximo=max(percentual)) %>% print(n=80)
write.csv(sintese, "sintese_result_quantidade_resultados_versus_original.csv")

## -------- GRAFICOS ARTIGO

# ATÉ 30 BRANCHES
ate30branches <- result %>% filter( total <= 30)
g <- ggplot(ate30branches, aes(x = project, y = percentual)) +
  geom_boxplot() +
  labs(y = "% Branch coverage", x = "Projects") + labs(title="Projects with up to 30 branches")  + 
  theme(plot.title = element_text(size = 30), axis.title = element_text(size = 25, color="grey20"), axis.text = element_text(size=20, color="grey20"), axis.text.x = element_text(angle = 45, hjust=1))
ggsave(filename = 'Rplot_00_30_branches.png', plot = g, device = png(), dpi="retina", width=15,height=9)

maisDe30branches <- result %>% filter( total > 30)
g <- ggplot(maisDe30branches, aes(x = project, y = percentual)) +
  geom_boxplot() +
  labs(y = "% Branch coverage", x = "Projects") + labs(title="Projects with more than 30 branches")  + 
  theme(plot.title = element_text(size = 30), axis.title = element_text(size = 25, color="grey20"), axis.text = element_text(size=20, color="grey20"), axis.text.x = element_text(angle = 45, hjust=1))
ggsave(filename = 'Rplot_30_354_branches.png', plot = g, device = png(), dpi="retina", width=15,height=9)



## -------- GRAFICOS DISSERTACAO

# ATÉ 10 BRANCHES
ate10branches <- result %>% filter( total <= 10)
g <- ggplot(ate10branches, aes(x = project, y = percentual)) +
  geom_boxplot() +
  labs(y = "% Cobertura de ramos", x = "Projetos") + labs(title="Projetos com até 10 ramos")  + 
  theme(plot.title = element_text(size = 30), axis.title = element_text(size = 25, color="grey20"), axis.text = element_text(size=20, color="grey20"), axis.text.x = element_text(angle = 45, hjust=1))
ggsave(filename = 'Rplot_00_10_branches.png', plot = g, device = png(), dpi="retina", width=15,height=9)


# DE 11 A 30 BRANCHES
de11a30branches <- result %>% filter( total %in% (11:30))
g <- ggplot(de11a30branches, aes(x = project, y = percentual)) +
  geom_boxplot() +  labs(y = "% Cobertura de ramos", x = "Projetos")  + labs(title="Projetos com 11 até 30 ramos")  + 
  #scale_x_discrete(guide=guide_axis(n.dodge=2)) +
  theme(plot.title = element_text(size = 30), axis.title = element_text(size = 25, color="grey20"), axis.text = element_text(size=20, color="grey20"), axis.text.x = element_text(angle = 45, hjust=1))
ggsave(filename = 'Rplot_11_30_branches.png', plot = g, device = png(), dpi="retina", width=15,height=9)


# DE 31 A 50 BRANCHES
de31a50branches <- result %>% filter( total %in% (31:50))
g <- ggplot(de31a50branches, aes(x = project, y = percentual)) +
  geom_boxplot() +
  labs(y = "% Cobertura de ramos", x = "Projetos") + labs(title="Projetos com 31 até 50 ramos")  + 
  theme(plot.title = element_text(size = 30), axis.title = element_text(size = 25, color="grey20"), axis.text = element_text(size=20, color="grey20"), axis.text.x = element_text(angle = 45, hjust=1))
ggsave(filename = 'Rplot_31_50_branches.png', plot = g, device = png(), dpi="retina", width=15,height=9)


# DE 51 A 100 BRANCHES
de51a100branches <- result %>% filter( total %in% (51:100))
g <- ggplot(de51a100branches, aes(x = project, y = percentual)) +
  geom_boxplot() +
  labs(y = "% Cobertura de ramos", x = "Projetos") + labs(title="Projetos com 51 até 100 ramos")  + 
  theme(plot.title = element_text(size = 30), axis.title = element_text(size = 25, color="grey20"), axis.text = element_text(size=20, color="grey20"), axis.text.x = element_text(angle = 45, hjust=1))
ggsave(filename = 'Rplot_51_100_branches.png', plot = g, device = png(), dpi="retina", width=15,height=9)

# ACIMA DE 100 BRANCHES
mais100branches <- result %>% filter( total > 100)
g <- ggplot(mais100branches, aes(x = project, y = percentual)) +
  geom_boxplot() +
  labs(y = "Cobertura de ramos", x = "Projetos") + labs(title="Projetos com mais de 100 ramos")  + 
  theme(plot.title = element_text(size = 30), axis.title = element_text(size = 25, color="grey20"), axis.text = element_text(size=20, color="grey20"), axis.text.x = element_text(angle = 45, hjust=1))
ggsave(filename = 'Rplot_101_354_branches.png', plot = g, device = png(), dpi="retina", width=15,height=9)

##################### CORRELAÇÕES
merda <- result %>% as.matrix()
cor(merda.covered, merda.total)


##################### GRÁFICO DE BARRAS 
sumario <- read_delim("sintese_result.csv",",")
barplot(sumario[2], names.arg = data[ ,1], ylab="% Cobertura", xlab="Projetos", main="Side-By-Side Bar Chart", col=c("media", "original" ), beside=TRUE, width=.3)


############# SINTESE / HISTOGRAMA #######################
sumario <- read_delim("sintese_result_com_original.csv",";")
sumario2 <- sumario %>% mutate(origem = 'Original', cor = 'setosa')
plot_multi_histogram <- function(df, feature, label_column) {
  plt <- ggplot(df, aes(x=eval(parse(text=feature)), fill=eval(parse(text=label_column)))) +
    geom_histogram(alpha=0.7, position="identity", color="black") +
    geom_density(alpha=0.7) +
    geom_vline(aes(xintercept=mean(eval(parse(text=feature)))), color="black", linetype="dashed", size=1) +
    labs(x=feature, y = "Density")
  plt + guides(fill=guide_legend(title=label_column))
}
g2 <-plot_multi_histogram(result, 'percentual', 'original')
ggsave(filename = 'histograma.png', plot = g2, device = png(), dpi="retina", width=15,height=9)
