clear all;
close all;
clc;

I = imread('a.png');

tam_sub_figuras = 400;

[M, N, L] = size(I);
Mdiv = floor(M / tam_sub_figuras);
Ndiv = floor(N / tam_sub_figuras);

Mini = floor((M - Mdiv * tam_sub_figuras)/2);
Nini = floor((N - Ndiv * tam_sub_figuras)/2);

nome_file_in = 'testes';

nfig = 1;
for u = 1 : Mdiv
    for v = 1 : Ndiv
        for i = 1 : tam_sub_figuras
            for j = 1 : tam_sub_figuras
                for k = 1 : L
                    FIG(i, j, k) = I(round(tam_sub_figuras * (u - 1) + i + Mini), round(tam_sub_figuras * (v - 1) + j + Nini), k);
                end
            end
        end
        nome_saida = sprintf('%04d.png', nfig);
        imwrite(uint8(FIG), nome_saida, 'Transparency', [1 1 1]);
        nfig = nfig + 1;
    end
end

