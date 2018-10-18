clear all;
close all;
clc;

M = 400;
N = 400;
I = ones(M, N, 3);
I(:, :, 1) = 255 * I(:, :, 1);
I(:, :, 2) = 255 * I(:, :, 2);
I(:, :, 3) = 255 * I(:, :, 3);
preto = zeros(1, 1, 3);

li = [200.5];
lj = [200.5];

faixa = 0.5;
Rg = 199.5;
for i = 1 : M
    for j = 1 : N
        for k = 1 : length(lj)
            i0 = li(k);
            j0 = lj(k);
            dist = (i - i0)^2 + (j - j0)^2;
            if (Rg-faixa)^2 <= dist && dist <= (Rg+faixa)^2
                I(i, j, :) = preto;
            end
        end
    end
end

imwrite(uint8(I), 'saida2.png');