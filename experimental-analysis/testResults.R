rm(list=ls()) #limpa aba "Environment"
cat("\014") #limpa console
getwd() #pegar a pasta corrente (área de trabalho)
list.files(path=getwd())
#install.packages("ggplot2")
library(ggplot2)

library(tidyverse)

result <- read_delim("testCaseResultsExperimental.csv",";")
summary(result)

sintese <- result %>% mutate(total=success_passed+success_fail+exception_passed+exception_fail, totalSucesso=success_passed+success_fail, totalExcecao=exception_passed+exception_fail)  %>% group_by(project,total,totalSucesso,totalExcecao) %>% summarize(conta = n(), maximoSuccededFail = max(success_fail), maximoExceptionFail=max(exception_fail)) %>%    print(n=80) 
write.csv(sintese, "sintese_testCaseresults.csv")
