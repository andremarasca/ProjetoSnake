clear all;
close all;
clc;

M = 1000;
N = 1000;
I = ones(M, N, 3);
I(:, :, 1) = 255 * I(:, :, 1);
I(:, :, 2) = 128 * I(:, :, 2);
I(:, :, 3) = 128 * I(:, :, 3);
preto = zeros(1, 1, 3);

i0 = 0;
j0 = 0;
R = 42.5;

li = [];
lj = [];

lj = (1 - 20 * R) : R : (M + 20 * R);
li = lj * 0 + M / 2;


Rg = 200;
for i = 1 : M
    for j = 1 : N
        for k = 1 : length(lj)
            i0 = li(k);
            j0 = lj(k);
            dist = (i - i0)^2 + (j - j0)^2;
            if (Rg-1)^2 <= dist && dist <= (Rg+1)^2
                I(i, j, :) = preto;
            end
        end
    end
end

imwrite(uint8(I), 'saida2.png');